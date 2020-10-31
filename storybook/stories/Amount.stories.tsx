import * as React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import Amount from '../../src/components/Amount';
import CenterView from './CenterView';

storiesOf('Amount', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('0€', () => <Amount text={text('Amount', '0.00')} />)
  .add('50€', () => <Amount text={text('Amount', '56.78')} />)
  .add('100€', () => <Amount text={text('Amount', '123.45')} />)
  .add('1000€', () => <Amount text={text('Amount', '1234.56')} />);
