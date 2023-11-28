import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

              : <View>
                  {(competitions.length > 0)
                    ? competitions.map((competition : Competition) => {
                        return (
                          <List.Item
                            title={competition.name}
                            description={competition.timestamp}
                            onPress={() => currentCompetitors(competition.id)}
                            key={competition.id}
                          />
                        )
                      })
                    : <Text>No competitions</Text>
                  }

                  <Button
                    style={{ marginTop: 20 }}
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