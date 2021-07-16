import 'package:flutter/material.dart';
import 'services.dart';

import './models/note.dart';

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

class NotesPage extends StatefulWidget {
  const NotesPage();

  @override
  _NotesPageState createState() => _NotesPageState();
}

class _NotesPageState extends State<NotesPage> {
  Future<void> _signOut() async {
    final success = await Services.of(context).authService.signOut();
    if (success) {
      Navigator.pushReplacement(context,
          MaterialPageRoute(builder: (_) => const HomePage(title: 'Just')));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('There was an issue logging out.')));
    }
  }

  Future<void> _addNote() async {
    final note = await Navigator.push<Note?>(
      context,
      MaterialPageRoute(builder: (context) => NotePage()),
    );
    if (note != null) {
      setState(() {});
    }
  }

  Future<void> _editNote(Note note) async {
    final updatedNote = await Navigator.push<Note?>(
      context,
      MaterialPageRoute(builder: (context) => NotePage(note: note)),
    );
    if (updatedNote != null) {
      setState(() {});
    }
  }

  Widget _toNoteWidget(Note note) {
    return Dismissible(
      key: ValueKey(note.id),
      direction: DismissDirection.endToStart,
      confirmDismiss: (_) =>
          Services.of(context).notesService.deleteNote(note.id),
      onDismissed: (_) => setState(() {}),
      background: Container(
        padding: const EdgeInsets.all(16.0),
        color: Theme.of(context).errorColor,
        alignment: Alignment.centerRight,
        child: Icon(Icons.delete),
      ),
      child: ListTile(
        title: Text(note.title),
        subtitle: Text(note.content ?? ''),
        onTap: () => _editNote(note),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Just'),
        actions: [_logOutButton(context)],
      ),
      body: ListView(
        children: [
          FutureBuilder<List<Note>>(
            future: Services.of(context).notesService.getNotes(),
            builder: (context, snapshot) {
              final notes = (snapshot.data ?? [])
                ..sort((x, y) =>
                    y.modifyTime.difference(x.modifyTime).inMilliseconds);
              return Column(
                children: notes.map(_toNoteWidget).toList(),
              );
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        label: const Text('Add note'),
        icon: const Icon(Icons.add),
        onPressed: _addNote,
      ),
    );
  }

  Widget _logOutButton(BuildContext context) {
    return IconButton(
      onPressed: _signOut,
      icon: const Icon(Icons.logout),
    );
  }
}

class NotePage extends StatefulWidget {
  final Note? note;

  const NotePage({this.note});

  @override
  _NotePageState createState() => _NotePageState();
}

class _NotePageState extends State<NotePage> {
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();

  Future<void> _saveNote_() async {
    if (_titleController.text.isEmpty) {
      _showSnackBar('Title cannot be empty.');
    }
    final note = await Services.of(context)
        .notesService
        .createNote(_titleController.text, _contentController.text);
    if (note != null) {
      Navigator.pop(context, note);
    } else {
      _showSnackBar('Something went wrong.');
    }
  }

  void _showSnackBar(String text) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(text)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.note != null ? 'Edit note' : 'New note'),
      ),
      body: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _titleController,
              decoration: InputDecoration(hintText: 'Title'),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _contentController,
              decoration: InputDecoration(hintText: 'Content'),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _saveNote,
        icon: Icon(Icons.save),
        label: Text('Save'),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    if (widget.note != null) {
      _titleController.text = widget.note!.title;
      _contentController.text = widget.note!.content ?? '';
    }
  }

  Future<void> _saveNote() async {
    final title = _titleController.text;
    final content = _contentController.text;
    if (title.isEmpty) {
      _showSnackBar('Title cannot be empty.');
      return;
    }
    final note = await _createOrUpdateNote(title, content);
    if (note != null) {
      Navigator.pop(context, note);
    } else {
      _showSnackBar('Something went wrong.');
    }
  }

  Future<Note?> _createOrUpdateNote(String title, String content) {
    final notesService = Services.of(context).notesService;
    if (widget.note != null) {
      return notesService.updateNote(widget.note!.id, title, content);
    } else {
      return notesService.createNote(title, content);
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }
}
