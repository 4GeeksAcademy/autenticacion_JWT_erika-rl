export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    case 'LOGIN_SUCCESS':
      return {
        ...store,
        notes: action.payload
      };

    case 'REGISTER_SUCCESS':
      return {
        ...store,
        auth: {
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        }
      };

    case 'LOGOUT':
      return {
        ...store,
        auth: {
          isAuthenticated: false,
          user: null,
          token: null
        },
        notes: [] // Limpiar notas al cerrar sesión
      };

    // Acciones para notas
    case 'SET_NOTES':
      return {
        ...store,
        notes: action.payload
      };

    case 'ADD_NOTE':
      return {
        ...store,
        notes: [...store.notes, action.payload]
      };

    case 'DELETE_NOTE':
      return {
        ...store,
        notes: store.notes.filter(note => note.id !== action.payload)
      };

    case 'SET_TOKEN':
      return {
        ...store,
        auth: {
          ...(store.auth || {}),
          token: action.payload,
        }
      };

    default:
      throw Error('Unknown action.');
  }    
}
