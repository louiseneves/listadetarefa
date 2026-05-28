import React from  'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Edit, Trash } from 'react-native-feather';
import { db,deleteDoc,doc} from './config';

export default function AppItem(props) {
    const taskId = props.id;
    function handleDeletePress() {
        Alert.alert(
            "Atenção",
            "Você tem certeza que deseja excluir este item?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Sim", onPress: () => {
                             apagarTarefa();
                    }
                }
            ],
            { cancelable: false }
        );
    }
    const apagarTarefa = async () => {
       try {
            const tarefaId = props.id;
            if (!tarefaId) {
                console.warn('ID da tarefa não encontrado.');
                return;
            }
            const tarefaRef = doc(db, 'tarefa', tarefaId);
            await deleteDoc(tarefaRef);
            // Recarregar as perguntas após a exclusão
            props.ButtonPress();
          } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
          }
    }
    const handleEditPress = async () => {
        props.navigation.navigate("Editar", {id:taskId,item:props.item,edit:true,ButtonPress:props.ButtonPress});  
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textItem}>{props.item}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeletePress}>
                    <Trash   color="white" size={18} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleEditPress}>
                    <Edit color="white" size={18} />
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 20,
        width: '100%'
    },
    buttonContainer: {
        flexDirection: "row"
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    textItem: {
        fontSize: 20,
    }
});