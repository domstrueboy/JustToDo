import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:supabase/supabase.dart';
import 'constants.dart';
import 'models/item.dart';

class ItemsService {
  static const items = MAIN_TABLE_NAME;

  final SupabaseClient _client;

  ItemsService(this._client);

  Future<List<Item>> getItems() async {
    final userId = _client.auth.currentUser?.id;
    final response = await _client
        .from(items)
        .select('id, title, description, create_time, modify_time')
        .eq('user_id', userId)
        .execute();
    if (response.error == null) {
      final results = response.data as List<dynamic>;
      return results.map((e) => toItem(e)).toList();
    }
    log('Error fetching items: ${response.error!.message}');
    return [];
  }

  Future<Item?> createItem(String title, String? description) async {
    final response = await _client
        .from(items)
        .insert({'title': title, 'description': description}).execute();
    if (response.error == null) {
      final results = response.data as List<dynamic>;
      return toItem(results[0]);
    }
    log('Error creating item: ${response.error!.message}');
    return null;
  }

  Future<Item?> updateItem(int id, String title, String? description) async {
    final response = await _client
        .from(items)
        .update({
          'title': title,
          'description': description,
          'modify_time': 'now()'
        })
        .eq('id', id)
        .execute();
    if (response.error == null) {
      final results = response.data as List<dynamic>;
      return toItem(results[0]);
    }
    log('Error editing item: ${response.error!.message}');
    return null;
  }

  Future<bool> deleteItem(int id) async {
    final response = await _client.from(items).delete().eq('id', id).execute();
    if (response.error == null) {
      return true;
    }
    log('Error deleting item: ${response.error!.message}');
    return false;
  }

  Item toItem(Map<String, dynamic> result) {
    return Item(
      result['id'],
      result['title'],
      result['description'],
      DateTime.parse(result['create_time']),
      DateTime.parse(result['modify_time']),
    );
  }
}

class Services extends InheritedWidget {
  final AuthService authService;
  final ItemsService itemsService;

  const Services._({
    required this.authService,
    required this.itemsService,
    required Widget child,
  }) : super(child: child);

  factory Services({required Widget child}) {
    final client = SupabaseClient(SUPABASE_URL, SUPABASE_API_KEY);
    final authService = AuthService(client.auth);
    final itemsService = ItemsService(client);
    return Services._(
      authService: authService,
      itemsService: itemsService,
      child: child,
    );
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
