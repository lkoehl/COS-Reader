import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Linking,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Gradients } from '@/constants/theme';

export default function SettingsModal() {
  const handleGitHubPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL('https://github.com/lkoehl/cos-reader');
  };

  const handleClosePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={Gradients.primary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Einstellungen</Text>
            <Link href="/" dismissTo style={styles.closeButton} onPress={handleClosePress}>
              <Ionicons name="close" size={24} color="white" />
            </Link>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* App Info Section */}
            <View style={styles.section}>
              <Text style={styles.appName}>COS-Reader</Text>
              <Text style={styles.version}>Version 1.0.0</Text>
              <Text style={styles.copyright}>© 2025 Lukas Köhl</Text>
              
              <Pressable style={styles.githubButton} onPress={handleGitHubPress}>
                <Ionicons name="logo-github" size={20} color="white" />
                <Text style={styles.githubText}>Quellcode auf GitHub</Text>
              </Pressable>
            </View>

            {/* Legal Section */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>HAFTUNGSAUSSCHLUSS</Text>
              <Text style={styles.legalText}>
                Keine Haftung für die Inhalte externer Links.
                {'\n\n'}
                Die Software wird ohne jede ausdrückliche oder implizierte Garantie bereitgestellt, 
                einschließlich der Garantie zur Benutzung für den vorgesehenen oder einem bestimmten 
                Zweck sowie jeglicher Rechtsverletzung, jedoch nicht darauf beschränkt.
                {'\n\n'}
                In keinem Fall sind die Autoren oder Copyright Inhaber für jeglichen Schaden oder 
                sonstige Ansprüche haftbar zu machen, ob infolge der Erfüllung eines Vertrages, 
                eines Deliktes oder anders im Zusammenhang mit der Software oder sonstiger 
                Verwendung der Software entstanden.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>LIZENZ</Text>
              <Text style={styles.legalText}>
                Dieses Programm ist freie Software. Sie können es unter den Bedingungen der 
                GNU General Public License, wie von der Free Software Foundation veröffentlicht, 
                weitergeben und/oder modifizieren, entweder gemäß Version 3 der Lizenz oder 
                (nach Ihrer Option) jeder späteren Version.
                {'\n\n'}
                Die Veröffentlichung dieses Programms erfolgt in der Hoffnung, dass es Ihnen 
                von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite 
                Garantie der MARKTREIFE oder der VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK.
                {'\n\n'}
                Details finden Sie in der GNU General Public License.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>ÜBER DIE APP</Text>
              <Text style={styles.legalText}>
                COS-Reader ist eine App zum Auslesen von Mensakarten über NFC. 
                Die App wurde entwickelt, um schnell und einfach das Guthaben 
                auf Ihrer Mensa-Chipkarte zu überprüfen.
                {'\n\n'}
                Diese App ist nicht offiziell von den Studentenwerken unterstützt 
                und dient nur zu Informationszwecken.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 20,
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 8,
  },
  githubText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
    letterSpacing: 1,
  },
  legalText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
});
