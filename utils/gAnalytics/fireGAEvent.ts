type WindowWithDataLayer = Window & {
    gtag: Function;
};

declare const window: WindowWithDataLayer;

type TrackerProps = {
    eventName: string;
    eventParameters?: Object;
};

export const googleTracker = ({ eventName, eventParameters }: TrackerProps) => {
    window.gtag('event', eventName, eventParameters);
};