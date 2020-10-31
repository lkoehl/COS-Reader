import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import Button from '../../src/components/Button';
import CenterView from './CenterView';

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Scannen', () => (
    <Button text={text('Text', 'Scannen')} onPress={action('scan-pressed')} />
  ));
