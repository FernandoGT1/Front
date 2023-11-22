import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';

const TodosContext = React.createContext ({
    todos: [], fetchTodos: ()=> {}
})

//post 
function AddTodo(){
  const [item,setItems] = React.useState("")
  const {todos,fetchTodos} = React.useContext(TodosContext)

const handleInput= event => {
  setItems(event.target.value)
}

const handleSubmit = event => {
  const newTodo = {
    "id": todos.length + 1,
    "item" : item
  }
  fetch("http://localhost:8000/Todo",
  {
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(newTodo)
  }).then(fetchTodos)
}

return(
  <form onSubmit={handleSubmit}>
    <InputGroup
    size="md"
    >
      <Input
      pr="4.5rem"
      type="text"
      placeholder="Agrega un auto Nuevo"
      arial-label="Add a todo item"
      onChange={handleInput}
      />
     
      </InputGroup>
  </form>
  )

};

//Put Todo
const UpdateTodo = ({ item, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todo, setTodo] = useState();
  const { fetchTodos } = React.useContext(TodosContext);

  const updateTodo = async () => {
    await fetch(`http://localhost:8000/Todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: todo }),
    });

    onClose();
    await fetchTodos();
  };

  // Resto del código...



return(
  <>
   <Button
   h="2rem"
   fontSize="1rem"
   fontWeight="bold"
   colorScheme="twitter"
   borderRadius="10px"
   boxShadow="md"
   _hover={{
    bg:"facebook.500"
   }}
   size="sm"
   onClick={onOpen}
   >
    Actualizar
   </Button>

  
<Modal
isOpen={isOpen}
onClose={onClose}>
  <ModalOverlay>
    <ModalContent>
      <ModalHeader> Actualizar </ModalHeader>
      <ModalCloseButton/>
      <ModalBody>
        <InputGroup size="md">
          <Input
          pr="4.5rem"
          type="text"
          placeholder="Actualizar"
          aria-label="Update a todo item"
          value={todo}
          onChange = {e => setTodo(e.target.value)}
          ></Input>
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button
         h="2rem" 
        fontSize="1rem"
        fontWeight="bold"
        colorScheme="twitter"
        borderRadius="10px"
        boxShadow="md"
        _hover = {{
          bg:"facebook.500"
        }}
        size="sm"
        onClick={updateTodo}
        > Actualizar Todo </Button>
      </ModalFooter>
    </ModalContent>
  </ModalOverlay>


</Modal>

  </>
)
}

//Delete Todo
function DeleteTodo({ id }) {
  const { fetchTodos } = React.useContext(TodosContext);

  const deleteTodo = async () => {
    await fetch(`http://localhost:8000/Todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    });

    await fetchTodos();
  };

  return (
    <Button
      h="2rem"
      fontSize="1rem"
      fontWeight="bold"
      colorScheme="yellow"
      borderRadius="10px"
      boxShadow="md"
      _hover={{ bg: "red.500" }}
      size="sm"
      onClick={deleteTodo}
    >
      Eliminar
    </Button>
  );
}






// Helper 

function TodoHelper({ item, id, fetchTodos }) {
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          {item}
          <Flex align="end">
            <UpdateTodo item={item} id={id} fetchTodos={fetchTodos} />
            <DeleteTodo id={id} fetchTodos={fetchTodos} />
          </Flex>
        </Text>
      </Flex>
    </Box>
  );
}



// Creating functional

export default function Todos(){
    const[todos,setTodos] = useState([])
    const fetchTodos = async () => {
      try {
          const response = await fetch('http://localhost:8000/Todo');
          const todos = await response.json();
          setTodos(todos.data);
      } catch (error) {
          console.error('Error fetching todos:', error);
      }
  };
  

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
  
<TodosContext.Provider value={{todos,fetchTodos}}>

<AddTodo/>






<Stack spacing={5}>
    {todos.map((todo) =>(
          // <b>{todo.item}</b>
          <TodoHelper item={todo.item}id ={todo.id} fetchTodos=
          {fetchTodos}></TodoHelper>
     ))}
    
</Stack>
</TodosContext.Provider>
  )
}


