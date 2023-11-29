import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TaskContext, Competition } from './context/TaskContext';
import { Button, List } from 'react-native-paper';
import NewCompetition from './components/NewCompetition';
import Results from './components/Results';

const Main : React.FC = () : React.ReactElement => {

  const { competitions, getCompetitors, 
          resultView, setResultView, 
          newCompetitionView, setNewCompetitionView 
        } = useContext(TaskContext);

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
                    onPress={() => setNewCompetitionView(true)}
                  >Uusi kilpailu</Button>
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