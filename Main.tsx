import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TaskContext, Competition } from './context/TaskContext';
import { Button, List } from 'react-native-paper';
import NewCompetition from './components/NewCompetition';
import Results from './components/Results';

const Main : React.FC = () : React.ReactElement => {

  const [newCompetition, setNewCompetition] = useState<boolean>(false);
  const [resultView, setResultView] = useState<boolean>(false);

  const { competitions, getCompetitors } = useContext(TaskContext);

  const currentCompetitors = (id : number) => {

    getCompetitors(id);

    setResultView(true);

  }

  return (
    <View style={styles.container}>
      
      {(newCompetition)

        ? <NewCompetition />

        : <>
            {(resultView)

              ? <Results />

              : <>
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
                    onPress={() => setNewCompetition(true)}
                  >Uusi kilpailu</Button>
                </>
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