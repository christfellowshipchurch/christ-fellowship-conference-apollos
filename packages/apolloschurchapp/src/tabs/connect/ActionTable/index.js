import React from 'react';
import { View } from 'react-native';

import {
  TableView,
  Cell,
  CellIcon,
  CellText,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H4,
} from '@apollosproject/ui-kit';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import NavigationActions from 'apolloschurchapp/src/NavigationService';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ActionTable = () => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <View>
        <TableView>
          <Touchable
            onPress={() =>
              openUrl(
                'https://www.google.com/maps/place/Christ+Fellowship+Church/@26.8106405,-80.1226569,17z/data=!3m1!4b1!4m5!3m4!1s0x88d92ac0d13189a5:0xfcd08babd72fd4ec!8m2!3d26.8106405!4d-80.1204682'
              )
            }
          >
            <Cell>
              <FontAwesome5 name={'map-marker-alt'} size={16} />
              <CellText>Driving Directions</CellText>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() =>
              openUrl(
                'https://gochristfellowship.com/privacypolicy/?clean=.footer-content'
              )
            }
          >
            <Cell>
              <FontAwesome5 name={'file-alt'} size={16} />
              <CellText>Privacy Policy</CellText>
            </Cell>
          </Touchable>
          <Divider />
        </TableView>
        {/* <TableView>
          <Touchable
            onPress={() => NavigationActions.navigate('TestingControlPanel')}
          >
            <Cell>
              <CellIcon name="settings" />
              <CellText>Open Testing Panel</CellText>
            </Cell>
          </Touchable>
        </TableView> */}
      </View>
    )}
  </WebBrowserConsumer>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
