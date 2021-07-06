import 'package:flutter/material.dart';
import 'services.dart';

void main() => runApp(const App());

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Services(
        child: MaterialApp(
      title: 'Just',
      theme: ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.blue,
      ),
      home: Builder(
        builder: (context) {
          return FutureBuilder<bool>(
            future: Services.of(context).authService.recoverSession(),
            builder: (context, snapshot) {
              final sessionRecovered = snapshot.data ?? false;
              return sessionRecovered ? NotesPage() : HomePage(title: 'Just');
            },
          );
        },
      ),
    ));
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  // HomePage
  void _signUp() async {
    final success = await Services.of(context)
        .authService
        .signUp(_emailController.text, _passwordController.text);
    await _handleResponse(success);
  }

  void _signIn() async {
    final success = await Services.of(context)
        .authService
        .signIn(_emailController.text, _passwordController.text);
    await _handleResponse(success);
  }

  Future<void> _handleResponse(bool success) async {
    if (success) {
      await Navigator.pushReplacement(
          context, MaterialPageRoute(builder: (_) => NotesPage()));
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Something went wrong.')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: Text('Just'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: TextField(
                controller: _emailController,
                keyboardType: TextInputType.emailAddress,
                decoration: InputDecoration(hintText: 'Email'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: InputDecoration(hintText: 'Password'),
              ),
            ),
            ElevatedButton.icon(
              onPressed: _signIn,
              icon: Icon(Icons.login),
              label: Text('Sign in'),
            ),
            ElevatedButton.icon(
              onPressed: _signUp,
              icon: Icon(Icons.app_registration),
              label: Text('Sign up'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}

class NotesPage extends StatelessWidget {
  const NotesPage();

  Future<void> _signOut(BuildContext context) async {
    final success = await Services.of(context).authService.signOut();
    if (success) {
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (_) => const HomePage(
                    title: 'Home',
                  )));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('There was an issue logging out.')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Just'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text('Your notes will show up here.'),
            ),
            ElevatedButton.icon(
              onPressed: () async {
                await _signOut(context);
              },
              icon: Icon(Icons.login),
              label: Text('Sign out'),
            ),
          ],
        ),
      ),
    );
  }
}
