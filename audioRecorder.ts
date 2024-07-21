import { Platform } from 'react-native';
import AudioRecorderPlayer, {
  AVEncodingOption,
  AudioSet,
} from 'react-native-audio-recorder-player';

class AudioRecorder {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor() {
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  public async startRecording(): Promise<string> {
    const path = Platform.select({
      ios: 'hello.m4a',
      android: 'sdcard/hello.mp4',
    }) as string;

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AVEncodingOption.aac,
      AudioSourceAndroid: 6, // Default
      AVEncoderAudioQualityKeyIOS: 2, // AVAudioQuality.high
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      console.log('Recording duration:', e.currentPosition);
    });

    return uri;
  }

  public async stopRecording(): Promise<string> {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    return result;
  }
}

export default AudioRecorder;
