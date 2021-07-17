import 'package:flutter/material.dart';
import 'services.dart';
import 'models/item.dart';

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
                return sessionRecovered
                    ? const ItemsPage()
                    : const HomePage(title: 'Just');
              },
            );
          },
        ),
      ),
    );
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
          context, MaterialPageRoute(builder: (_) => const ItemsPage()));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Something went wrong.'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).primaryColor,
        title: const Text('Just'),
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
                decoration: const InputDecoration(hintText: 'Email'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: const InputDecoration(hintText: 'Password'),
              ),
            ),
            ElevatedButton.icon(
              onPressed: _signIn,
              icon: const Icon(Icons.login),
              label: const Text('Sign in'),
            ),
            ElevatedButton.icon(
              onPressed: _signUp,
              icon: const Icon(Icons.app_registration),
              label: const Text('Sign up'),
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

class ItemsPage extends StatefulWidget {
  const ItemsPage();

  @override
  _ItemsPageState createState() => _ItemsPageState();
}

class _ItemsPageState extends State<ItemsPage> {
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

  Future<void> _addItem() async {
    final item = await Navigator.push<Item?>(
      context,
      MaterialPageRoute(builder: (context) => const ItemPage()),
    );
    if (item != null) {
      setState(() {});
    }
  }

  Future<void> _editItem(Item item) async {
    final updatedItem = await Navigator.push<Item?>(
      context,
      MaterialPageRoute(builder: (context) => ItemPage(item: item)),
    );
    if (updatedItem != null) {
      setState(() {});
    }
  }

  Widget _toItemWidget(Item item) {
    return Dismissible(
      key: ValueKey(item.id),
      direction: DismissDirection.endToStart,
      confirmDismiss: (_) =>
          Services.of(context).itemsService.deleteItem(item.id),
      onDismissed: (_) => setState(() {}),
      background: Container(
        padding: const EdgeInsets.all(16.0),
        color: Theme.of(context).errorColor,
        alignment: Alignment.centerRight,
        child: const Icon(Icons.delete),
      ),
      child: ListTile(
        title: Text(item.title),
        subtitle: Text(item.content ?? ''),
        onTap: () => _editItem(item),
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
          FutureBuilder<List<Item>>(
            future: Services.of(context).itemsService.getItems(),
            builder: (context, snapshot) {
              final items = (snapshot.data ?? [])
                ..sort((x, y) =>
                    y.modifyTime.difference(x.modifyTime).inMilliseconds);
              return Column(
                children: items.map(_toItemWidget).toList(),
              );
            },
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        label: const Text('Add event'),
        icon: const Icon(Icons.add),
        onPressed: _addItem,
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

class ItemPage extends StatefulWidget {
  final Item? item;

  const ItemPage({this.item});

  @override
  _ItemPageState createState() => _ItemPageState();
}

class _ItemPageState extends State<ItemPage> {
  final _titleController = TextEditingController();
  final _contentController = TextEditingController();

  void _showSnackBar(String text) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(text)));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.item != null ? 'Edit event' : 'New event'),
      ),
      body: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _titleController,
              decoration: const InputDecoration(hintText: 'Title'),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _contentController,
              decoration: const InputDecoration(hintText: 'Content'),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _saveItem,
        icon: const Icon(Icons.save),
        label: const Text('Save'),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    if (widget.item != null) {
      _titleController.text = widget.item!.title;
      _contentController.text = widget.item!.content ?? '';
    }
  }

  Future<void> _saveItem() async {
    final title = _titleController.text;
    final content = _contentController.text;
    if (title.isEmpty) {
      _showSnackBar('Title cannot be empty.');
      return;
    }
    final item = await _createOrUpdateItem(title, content);
    if (item != null) {
      Navigator.pop(context, item);
    } else {
      _showSnackBar('Something went wrong.');
    }
  }

  Future<Item?> _createOrUpdateItem(String title, String content) {
    final itemsService = Services.of(context).itemsService;
    if (widget.item != null) {
      return itemsService.updateItem(widget.item!.id, title, content);
    } else {
      return itemsService.createItem(title, content);
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }
}
