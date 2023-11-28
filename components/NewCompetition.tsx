import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Competitor, TaskContext } from '../context/TaskContext';
import { Button, Dialog, FAB, Portal, TextInput } from 'react-native-paper';
import StartCompetition from './StartCompetition';

interface DialogData {
    open : boolean;
    name : string;
}

const NewCompetition : React.FC = () : React.ReactElement => {

    const { competitors, setCompetitors, 
            roundsView, setRoundsView,
            setNewCompetitionView } = useContext(TaskContext);

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

    useEffect(() => {

      setCompetitors([]);
      
    }, [])

  return (
    <>
      {(roundsView)

        ?  <StartCompetition />

        : <>
            <View style={styles.container}>
              <Text
                style={{ fontSize: 26, marginTop: 60 }}
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
                style={{ marginBottom: 50 }}
              >
                <Button
                  style={{ marginTop: 20 }}
                  mode="contained"
                  onPress={() => setDialog({ ...dialog, open: true })}
                >Lisää kilpailija</Button>

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

            <FAB
              style={{ position: 'absolute', top : 0, left : 0, margin : 10,  marginTop : 35}}
              icon="close"
              onPress={() => setNewCompetitionView(false)}
            />
          </>
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