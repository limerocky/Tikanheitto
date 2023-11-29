import React, { useContext } from 'react';
import { ActivityIndicator, FAB, MD2Colors, Text } from 'react-native-paper';
import { Competitor, TaskContext } from '../context/TaskContext';
import { ScrollView, View } from 'react-native';

const Results : React.FC = () : React.ReactElement => {

  const { competitors, setCompetitors, setResultView, setRounds } = useContext(TaskContext);

  const winners : Competitor[] = competitors.filter(
    (competitor : Competitor) => competitor.points === competitors[0].points
  );

  const handleClose = () : void => {

    setCompetitors([]);

    setRounds(1);
    setResultView(false);
  }

  return(
    <>
      {(competitors.length > 0)
        ? <View>
            <ScrollView 
              style={{ marginTop : 50  }}
              contentContainerStyle={{ alignItems : 'center' }}
            >

              <Text
                style={{ fontSize: 35 }}
              >Kilpailun voitti</Text>

              {winners.map((winner : Competitor, idx : number) => {
                return (
                  <Text 
                    style={{ marginTop: 10, fontSize: 26, flex : 1 }}
                    key={idx}
                  >{winner.name}</Text>
                );
              })}

              <Text
                style={{ fontSize : 30, marginTop : 50 }}
              >Pisteet</Text>

              {competitors.map((competitor : Competitor, idx : number) => {
                return (
                  <View
                    style={{ flexDirection : 'row', marginTop : 10 }}
                    key={idx}
                  >
                    <Text 
                      style={{ fontSize: 20, flex : 1 }}
                    > {competitor.name} </Text>

                    <Text 
                      style={{ fontSize: 20 }}
                    > {competitor.points} </Text>
                  </View>
                );
              })}

            </ScrollView>
          </View>

        : <ActivityIndicator animating={competitors.length === 0} color={MD2Colors.red800} size={'large'}/>
      }

      <FAB
        style={{ position: 'absolute', top : 0, left : 0, margin : 10,  marginTop : 35}}
        icon="close"
        onPress={handleClose}
      />
    </>
  );
}

export default Results;