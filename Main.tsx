import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TaskContext, Competition } from './context/TaskContext';
import { Button, Dialog, List, Portal } from 'react-native-paper';
import NewCompetition from './components/NewCompetition';
import Results from './components/Results';

const Main : React.FC = () : React.ReactElement => {

  const { competitions, getCompetitors, 
          resultView, setResultView, 
          newCompetitionView, setNewCompetitionView, 
          setCompetitionType
        } = useContext(TaskContext);

  const [dialog, setDialog] = useState<boolean>(false);

  const currentCompetitors = (id : number) => {

    getCompetitors(id);

    setResultView(true);

  }

  return (
    <View style={styles.container}>
      
      {(newCompetitionView)

        ? <NewCompetition />

        : <>
            {(resultView)

              ? <Results />

              : <View
                  style={{ marginTop: 30, marginBottom: 5 }}
                >
                  {(competitions.length > 0)
                    ? <View style={{height : 500}}>
                        <ScrollView>
                          {competitions.map((competition : Competition) => {
                            return (
                              <List.Item
                                title={competition.name}
                                description={competition.timestamp}
                                onPress={() => currentCompetitors(competition.id)}
                                key={competition.id}
                              />
                            )
                          })}
                        </ScrollView>
                      </View>

                    : <Text
                        style={{ marginBottom: 5, fontSize: 20 }}
                      >No competitions</Text>
                  }

                  <Button
                    style={{ marginTop: 5 }}
                    mode="contained"
                    onPress={() => setDialog(true)}
                  >Uusi kilpailu</Button>

                  <Portal>
                    <Dialog
                      style={{ alignItems: "center" }}
                      visible={dialog}
                      onDismiss={() => setDialog(false)}
                    >
                      <Dialog.Title>Kilpailun muoto</Dialog.Title>

                      <Dialog.Content>
                        <Button
                          style={{ marginBottom: 5 }}
                          mode="contained"
                          onPress={() => {
                            setCompetitionType("Mökkitikka");
                            setDialog(false);
                            setNewCompetitionView(true);
                          }}
                        > Mökkitikka </Button>
                        <Button
                          mode="contained"
                          onPress={() => {
                            setCompetitionType("Darts 501");
                            setDialog(false);
                            setNewCompetitionView(true);
                          }}
                        > Darts 501 </Button>
                      </Dialog.Content>

                    </Dialog>
                  </Portal>
                </View>
            }
          </>
      }

      <StatusBar style="auto" />

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

export default Main;