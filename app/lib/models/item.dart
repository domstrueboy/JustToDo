class Item {
  final int id;
  final String title;
  final String? description;
  // final bool done;
  // final bool public;
  // final ERepeat repeat;
  final DateTime createTime;
  final DateTime modifyTime;

  Item(this.id, this.title, this.description, this.createTime, this.modifyTime);
}

enum ERepeat {
  no,
  everyday,
  weekdays,
  weekends,
  // etc
}
