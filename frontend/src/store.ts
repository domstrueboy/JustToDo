export default {
  state () {
    return {
      todos: {
        todo1: {
          title: 'Todo 1',
          description: 'Desc 1',
          items: [
            {
              title: 'Make this world the better place',
              description: '',
              done: false,
              repeat: 'everyday',
              createTime: 0,
              editTime: 0,
            }
          ]
        }
      }
    }
  }
}