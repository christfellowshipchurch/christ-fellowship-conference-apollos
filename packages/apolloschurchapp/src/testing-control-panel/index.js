import React, { PureComponent } from 'react';
import { TableView, Divider } from '@apollosproject/ui-kit';
import { OpenUserWebView } from 'apolloschurchapp/src/user-web-view/Provider';
import ChangeLivestream from './ChangeLivestream';
import TouchableCell from './TouchableCell';

export default class TestingControlPanel extends PureComponent {
  static navigationOptions = () => ({
    title: 'Testing Control Panel',
  });

  render() {
    return (
      <TableView>
        <ChangeLivestream />
        <Divider />
        <TouchableCell
          handlePress={() =>
            OpenUserWebView(
              'https://my.christfellowshipconference.com/breakouts'
            )
          }
          iconName={'download'}
          cellText={'Open User Web View'}
        />
      </TableView>
    );
  }
}
