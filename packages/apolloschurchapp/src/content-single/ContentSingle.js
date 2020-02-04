import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get, has } from 'lodash';
import PropTypes from 'prop-types';

import { ErrorCard, ThemeMixin } from '@apollosproject/ui-kit';

import TrackEventWhenLoaded from 'apolloschurchapp/src/analytics/TrackEventWhenLoaded';
import { events } from 'apolloschurchapp/src/analytics';

import NavigationHeader from '../ui/NavigationHeader';
import getContentItem from './getContentItem';

import UniversalContentItem from './UniversalContentItem';
import Breakout from './Breakout';

class ContentSingle extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      push: PropTypes.func,
    }),
    headerColor: PropTypes.string,
  };

  static navigationOptions = ({ navigation }) => {
    const { title, headerTitle, theme } = get(navigation, 'state.params', {});

    return {
      header: (
        <NavigationHeader
          title={headerTitle || title}
          theme={theme}
          nested
          goBack={() => navigation.goBack(null)}
        />
      ),
    };
  };

  get itemId() {
    return this.props.navigation.getParam('itemId', []);
  }

  get queryVariables() {
    return { itemId: this.itemId };
  }

  renderContent = ({ content, loading, error }) => {
    let { __typename } = content;
    if (!__typename && this.itemId) {
      [__typename] = this.itemId.split(':');
    }

    switch (__typename) {
      case 'Breakout':
        return (
          <Breakout
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
            navigation={this.props.navigation}
          />
        );
      case 'UniversalContentItem':
      default:
        return (
          <UniversalContentItem
            id={this.itemId}
            content={content}
            loading={loading}
            error={error}
            navigation={this.props.navigation}
          />
        );
    }
  };

  renderWithData = ({ loading, error, data }) => {
    if (error) return <ErrorCard error={error} />;

    const content = data.node || {};

    const { theme = {} } = content;

    return (
      <ThemeMixin
        mixin={{
          type: get(theme, 'type', 'light').toLowerCase(),
          colors: get(theme, 'colors'),
        }}
      >
        <TrackEventWhenLoaded
          loaded={!!(!loading && content.title)}
          eventName={events.ViewContent}
          properties={{
            title: content.title,
            itemId: this.itemId,
          }}
        />
        {this.renderContent({ content, loading, error, theme })}
      </ThemeMixin>
    );
  };

  render() {
    return (
      <Query query={getContentItem} variables={this.queryVariables}>
        {this.renderWithData}
      </Query>
    );
  }
}

export default ContentSingle;
