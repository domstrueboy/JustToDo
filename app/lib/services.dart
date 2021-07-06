import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:supabase/supabase.dart';

import 'keys.dart';

class Services extends InheritedWidget {
  final AuthService authService;

  Services._({
    required this.authService,
    required Widget child,
  }) : super(child: child);

  factory Services({required Widget child}) {
    final client = SupabaseClient(supabaseUrl, supabaseApiKey);
    final authService = AuthService(client.auth);
    return Services._(authService: authService, child: child);
  }

  @override
  bool updateShouldNotify(InheritedWidget oldWidget) {
    return false;
  }

  static Services of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<Services>()!;
  }
}

class AuthService {
  final GoTrueClient _client;

  AuthService(this._client);

  static const supabaseSessionKey = 'supabase_session';

  Future<bool> signUp(String email, String password) async {
    final response = await _client.signUp(email, password);
    if (response.error == null) {
      log('Sign up was successful for user ID: ${response.user!.id}');
      _persistSession(response.data!);
      return true;
    }
    log('Sign up error: ${response.error!.message}');
    return false;
  }

  Future<bool> signIn(String email, String password) async {
    final response = await _client.signIn(email: email, password: password);
    if (response.error == null) {
      log('Sign in was successful for user ID: ${response.user!.id}');
      _persistSession(response.data!);
      return true;
    }
    log('Sign in error: ${response.error!.message}');
    return false;
  }

  Future<bool> signOut() async {
    final response = await _client.signOut();
    if (response.error == null) {
      log('Successfully logged out; clearing session string');
      final prefs = await SharedPreferences.getInstance();
      prefs.remove(supabaseSessionKey);
      return true;
    }
    log('Log out error: ${response.error!.message}');
    return false;
  }

  Future<void> _persistSession(Session session) async {
    final prefs = await SharedPreferences.getInstance();
    log('Persisting session string');
    await prefs.setString(supabaseSessionKey, session.persistSessionString);
  }

  Future<bool> recoverSession() async {
    final prefs = await SharedPreferences.getInstance();
    if (prefs.containsKey(supabaseSessionKey)) {
      log('Found persisted session string, attempting to recover session');
      final jsonStr = prefs.getString(supabaseSessionKey)!;
      final response = await _client.recoverSession(jsonStr);
      if (response.error == null) {
        log('Session successfully recovered for user ID: ${response.user!.id}');
        _persistSession(response.data!);
        return true;
      }
    }
    return false;
  }
}
