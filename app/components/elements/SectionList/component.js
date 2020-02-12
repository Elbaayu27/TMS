//This is an example code for SectionList//
import React from 'react';
//import react in our code. 
import { StyleSheet , View , SectionList , Text , Platform , Alert} from 'react-native';
//import all the components we are going to use. 
import { noop } from '../../../utils';
 
export default class Component extends React.Component {
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View style={{height: 1, width: 500, backgroundColor: '#000000'}}/>
    );
  };
  render() {
    const {onPress = noop, dataProject} = this.props;
    return (
      <View>
        <SectionList
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={[
            { title: dataProject.title, data: dataProject.listData },
          ]}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <Text
              style={styles.SectionListItemStyle}
              //Item Separator View
              onPress={onPress}>
              {item.name}
            </Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  SectionHeaderStyle: {
    backgroundColor: '#289f97',
    fontSize: 15,
    padding: 5,
    color: '#fff',
    alignSelf:'stretch',
    textAlign:'center',
    fontStyle:'italic'
  

  },
  SectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#F5F5F5',
  },
});