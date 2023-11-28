import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Competitor, TaskContext } from '../context/TaskContext';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import StartCompetition from './StartCompetition';

interface DialogData {
    open : boolean;
    name : string;
}

const NewCompetition : React.FC = () : React.ReactElement => {

    const { competitors, setCompetitors } = useContext(TaskContext);

    const [start, setStart] = useState<boolean>(false);
    const [dialog, setDialog] = useState<DialogData>({
        open: false,
        name: "",
    });

    const addCompetitor = () : void => {

        setCompetitors([
            ...competitors,
            {
                name: (dialog.name) ? dialog.name : "placeholder",
                points: 0,
            }
        ]);

        setDialog({ open: false, name: "", });

    }

  return (
    <View style={styles.container}>

      {(start)

      ?   <StartCompetition />

      :   <>
            <Text
              style={{ fontSize: 26 }}
            >Kilpailijat:</Text>

            {competitors.map((competitor : Competitor, idx : number) => {
              return (
                <Text 
                  key={idx}
                  style={{ marginTop: 10, fontSize: 20 }}
                >{competitor.name}</Text>
              );
            })}

            <Button
              style={{ marginTop: 20 }}
              mode="contained"
              onPress={() => setDialog({ ...dialog, open: true })}
            >Lisää kilpailija</Button>

            <Button
              style={{ marginTop: 20 }}
              mode="contained"
              disabled={competitors.length < 2}
              onPress={() => setStart(true)}
            > Aloita kilpailu </Button>

            <Portal>
              <Dialog
                visible={dialog.open}
                onDismiss={() => setDialog({ open: false, name: ""})}
              >
                <Dialog.Title>Uusi kilpailija</Dialog.Title>
                <Dialog.Content>
                  <TextInput 
                      label="Nimi"
                      value={dialog.name}
                      onChangeText={(text : string) => setDialog({ ...dialog, name: text })}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={addCompetitor}> Lisää</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewCompetition;