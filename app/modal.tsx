import EnhancedBackground from "@/components/EnhancedBackground";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsModal() {
  const handleGitHubPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Linking.openURL("https://github.com/lkoehl/cos-reader");
  };

  const handleClosePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <EnhancedBackground variant="cosmic">
        <SafeAreaView style={styles.safeArea}>
          {/* Header mit Swipe-Indikator */}
          <View style={styles.header}>
            <View style={styles.swipeIndicator} />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Einstellungen</Text>
              <Pressable
                style={styles.closeButton}
                onPress={handleClosePress}
                android_ripple={{ color: 'transparent' }}
              >
                <Ionicons name="close" size={26} color="white" />
              </Pressable>
            </View>
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* App Info Section */}
            <View style={styles.section}>
              <Text style={styles.appName}>COS-Reader</Text>
              <Text style={styles.version}>Version 1.0.0</Text>
              <Text style={styles.copyright}>© 2025 Lukas Köhl</Text>

              <Pressable
                style={styles.githubButton}
                onPress={handleGitHubPress}
              >
                <Ionicons name="logo-github" size={20} color="white" />
                <Text style={styles.githubText}>Quellcode auf GitHub</Text>
              </Pressable>
            </View>

            {/* Legal Section */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>HAFTUNGSAUSSCHLUSS</Text>
              <Text style={styles.legalText}>
                Keine Haftung für die Inhalte externer Links.
                {"\n\n"}
                Die Software wird ohne jede ausdrückliche oder implizierte
                Garantie bereitgestellt, einschließlich der Garantie zur
                Benutzung für den vorgesehenen oder einem bestimmten Zweck sowie
                jeglicher Rechtsverletzung, jedoch nicht darauf beschränkt.
                {"\n\n"}
                In keinem Fall sind die Autoren oder Copyright Inhaber für
                jeglichen Schaden oder sonstige Ansprüche haftbar zu machen, ob
                infolge der Erfüllung eines Vertrages, eines Deliktes oder
                anders im Zusammenhang mit der Software oder sonstiger
                Verwendung der Software entstanden.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>LIZENZ</Text>
              <Text style={styles.legalText}>
                Dieses Programm ist freie Software. Sie können es unter den
                Bedingungen der GNU General Public License, wie von der Free
                Software Foundation veröffentlicht, weitergeben und/oder
                modifizieren, entweder gemäß Version 3 der Lizenz oder (nach
                Ihrer Option) jeder späteren Version.
                {"\n\n"}
                Die Veröffentlichung dieses Programms erfolgt in der Hoffnung,
                dass es Ihnen von Nutzen sein wird, aber OHNE IRGENDEINE
                GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder
                der VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK.
                {"\n\n"}
                Details finden Sie in der GNU General Public License.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>ÜBER DIE APP</Text>
              <Text style={styles.legalText}>
                COS-Reader ist eine App zum Auslesen von Mensakarten über NFC.
                Die App wurde entwickelt, um schnell und einfach das Guthaben
                auf Ihrer Mensa-Chipkarte zu überprüfen.
                {"\n\n"}
                Diese App ist nicht offiziell von den Studentenwerken
                unterstützt und dient nur zu Informationszwecken.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </EnhancedBackground>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  swipeIndicator: {
    width: 36,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    marginBottom: 20,
  },
  githubButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  githubText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginBottom: 12,
    letterSpacing: 1,
  },
  legalText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 20,
  },
});
