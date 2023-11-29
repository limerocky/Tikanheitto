import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Competitor, TaskContext } from '../context/TaskContext';
import SelectRounds from './SelectRounds';

interface DialogData {
  open : boolean;
  name : string;
}

const NewCompetition : React.FC = () : React.ReactElement => {

  const { competitors, setCompetitors, 
          roundsView, setRoundsView } = useContext(TaskContext);

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
    <>
      {(roundsView)

        ?  <SelectRounds />

        : <View 
            style={styles.container}
          >
            <Text
              style={{ fontSize: 26, marginTop: 50 }}
            >Kilpailijat:</Text>

            <ScrollView
              contentContainerStyle={{ alignItems: 'center' }}
            >
              {competitors.map((competitor : Competitor, idx : number) => {
                return (
                  <Text 
                    key={idx}
                    style={{ marginTop: 10, fontSize: 20 }}
                  >{competitor.name}</Text>
                );
              })}
            </ScrollView>

            <View
              style={{ marginBottom: 20 }}
            >
              <Button
                style={{ marginTop: 20 }}
                mode="contained"
                onPress={() => setDialog({ ...dialog, open: true })}
              > Lisää kilpailija </Button>

              <Button
                style={{ marginTop: 20 }}
                mode="contained"
                disabled={competitors.length < 2}
                onPress={() => setRoundsView(true)}
              > Aloita kilpailu </Button>

            </View>

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
          </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default NewCompetition;