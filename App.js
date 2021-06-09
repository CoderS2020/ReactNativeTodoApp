import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet,  View , FlatList,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Header from './components/header';
import ToDoItem from './components/todoitem';
import AddToDo from './components/addToDo'


export default function App() {
  const [todos,setTodos]=useState([
    {text:'excercise',key:'1'},
    {text:'drink juice',key:'2'},
    {text:'learn react native',key:'3'},

  ]);

  const pressHandler=(key)=>{
    setTodos((prevtodos)=>{
      return prevtodos.filter(todo=>todo.key!=key)
    })
  };

  const submitHandler =(text)=>{
    if(text.length>3){
      setTodos((prevtodos)=>{
        return [{text:text, key: Math.random().toString()},...prevtodos]
      })
    }
    else{
      Alert.alert('OOPS','ToDos must be over 3 characters long',
      [
        {text:'Understood',onPress:()=>console.log('alert closed')}
      ])
    }
    
  }

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
    <View style={styles.container}>

      <Header/>
      <View style={styles.content}>
        <AddToDo submitHandler={submitHandler}/>
        <View style={styles.list}>
          <FlatList 
            data={todos}
            renderItem={({item})=>(
              <ToDoItem doitem={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
      
      
      <StatusBar style="auto" />
    </View>

    </TouchableWithoutFeedback>



  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff'
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop:20
  }
});
