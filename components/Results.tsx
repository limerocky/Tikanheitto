import React, { useContext } from 'react';
import { Text } from 'react-native-paper';
import { Competitor, TaskContext } from '../context/TaskContext';
import { View } from 'react-native';

const Results : React.FC = () : React.ReactElement => {

  const { competitors } = useContext(TaskContext);

  const winners : Competitor[] = competitors.filter(
    (competitor : Competitor) => competitor.points === competitors[0].points
  );

  return(
    <View style={{ flex : 1, marginTop : 50, alignItems : "center" }}>
      <Text
        style={{ fontSize: 35 }}
      >Kilpailun voitti</Text>
      {winners.map((winner : Competitor, idx : number) => {
        return (
          <Text 
            style={{ marginTop: 10, fontSize: 26}}
            key={idx}
          >{winner.name}</Text>
        );
      })}
      <Text
        style={{ fontSize : 30, marginTop : 50 }}
      >Pisteet</Text>
      {competitors.map((competitor : Competitor, idx : number) => {
        return (
          <Text 
            key={idx}
            style={{ marginTop: 10, fontSize: 20 }}
          >{competitor.name} {competitor.points}</Text>
        );
      })}
    </View>
  );
}

export default Results;