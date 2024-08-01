declare module '@zegocloud/zego-uikit-prebuilt-call-rn' {
  import { ComponentType } from 'react';

  export interface CallConfig {
    onCallEnd: (callID: string, reason: string, duration: number) => void;
  }

  export const ONE_ON_ONE_VIDEO_CALL_CONFIG: CallConfig;
  export const ONE_ON_ONE_VOICE_CALL_CONFIG: CallConfig;
  export const GROUP_VIDEO_CALL_CONFIG: CallConfig;
  export const GROUP_VOICE_CALL_CONFIG: CallConfig;

  export interface ZegoUIKitPrebuiltCallProps {
    appID: string;
    appSign: string;
    userID: string;
    userName: string;
    callID: string;
    config: CallConfig;
  }

  export const ZegoUIKitPrebuiltCall: ComponentType<ZegoUIKitPrebuiltCallProps>;
}
