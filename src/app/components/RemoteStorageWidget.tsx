import { useEffect } from "react";
import Widget from "remotestorage-widget";
import RemoteStorage from "remotestoragejs";

export default function RemoteStorageWidget({
    remoteStorage,
    elementId
}: {
    remoteStorage: RemoteStorage;
    elementId: string;
}) {
    useEffect(() => {
        const widget = new Widget(remoteStorage);
        widget.attach(elementId);
    }, [elementId, remoteStorage]);
    return <></>
}