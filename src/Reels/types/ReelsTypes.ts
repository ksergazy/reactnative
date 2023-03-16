import { AVPlaybackSource } from "expo-av/build/AV.types";

type videoProps = {
    _id: string;
    uri: AVPlaybackSource;
};

type ReelsProps = {
    videos: videoProps[];

    // Container Props
    backgroundColor?: string;

    // Other Props
    [key: string]: any;
};


type ReelCardProps = {
    _id: string;
    uri: AVPlaybackSource | any;
    ViewableItem: string;

    // Container Props
    backgroundColor?: string;

    // Other Props
    [key: string]: any;
};


export type { ReelCardProps, ReelsProps, videoProps };