import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
  ScrollView,
} from 'react-native';
import {version} from '../../package.json';

const Settings = (props) => {
  const backPressed = () => {
    props.setVisibility(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={backPressed}>
        <Text style={styles.doneButton}>Fertig</Text>
      </TouchableOpacity>
      <ScrollView>
        <SafeAreaView style={{alignItems: 'center'}}>
          <Text style={styles.appName}>COS-Reader</Text>
          <Text style={styles.version}>{'v' + version}</Text>
          <Text style={styles.copyright}>© 2020 PurplePenguinHeinz</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://github.com/lkoehl/cos-reader');
            }}>
            <Text style={styles.github}>Quellcode auf GitHub</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <Text style={styles.header}>HAFTUNGSAUSSCHLUSS</Text>
        <Text style={styles.text}>
          {
            'Keine Haftung für die Inhalte externer Links.\nDie Software wird ohne jede ausdrückliche oder implizierte Garantie bereitgestellt, einschließlich der Garantie zur Benutzung für den vorgesehenen oder einem bestimmten Zweck sowie jeglicher Rechtsverletzung, jedoch nicht darauf beschränkt. In keinem Fall sind die Autoren oder Copyright Inhaber für jeglichen Schaden oder sonstige Ansprüche haftbar zu machen, ob infolge der Erfüllung eines Vertrages, eines Deliktes oder anders im Zusammenhang mit der Software oder sonstiger Verwendung der Software entstanden.'
          }
        </Text>
        <Text style={styles.header}>LIZENZ</Text>
        <Text style={styles.text}>
          {
            'Dieses Programm ist freie Software. Sie können es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veröffentlicht, weitergeben und/oder modifizieren, entweder gemäß Version 3 der Lizenz oder (nach Ihrer Option) jeder späteren Version.\nDie Veröffentlichung dieses Programms erfolgt in der Hoffnung, dass es Ihnen von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK. Details finden Sie in der GNU General Public License.\nSie sollten ein Exemplar der GNU General Public License zusammen mit diesem Programm erhalten haben. Falls nicht, siehe http://www.gnu.org/licenses/.'
          }
        </Text>

        <Text style={styles.header}>{'REACT & REACT-NATIVE'}</Text>
        <Text style={styles.text}>
          {
            'MIT License\n\nCopyright (c) Facebook, Inc. and its affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
          }
        </Text>

        <Text style={styles.header}>{'REACT-NATIVE-NFC-MANAGER'}</Text>
        <Text style={styles.text}>
          {
            'Copyright 2020 whitedogg13\n\nLicensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at\n\nhttp://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'
          }
        </Text>

        <Text style={styles.header}>{'MENSA-CARD-READER'}</Text>
        <Text style={styles.text}>
          {
            'MIT License\n\nCopyright (c) 2020 NilsBaumgartner1994\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
          }
        </Text>

        <Text style={styles.header}>{'REACT-NATIVE-LINEAR-GRADIENT'}</Text>
        <Text style={styles.text}>
          {
            'MIT License\n\nCopyright (c) 2016 React Native Community\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.'
          }
        </Text>
        <View style={{height: 50}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },
  doneButton: {
    fontSize: 16,
    height: 22,
    margin: 16,
    fontWeight: '600',
    textAlign: 'right',
    color: '#007AFF',
  },
  appName: {fontSize: 24, marginBottom: 4},
  version: {fontSize: 14, fontWeight: '700', marginBottom: 4},
  copyright: {fontSize: 14, fontWeight: '300', marginBottom: 4},
  github: {color: '#007AFF'},
  header: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: 0.2,
    margin: 8,
    marginTop: 24,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#fcfcfc',
  },
});

export default Settings;
