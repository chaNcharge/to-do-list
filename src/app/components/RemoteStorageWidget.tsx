import Widget from "remotestorage-widget";
import RemoteStorage from "remotestoragejs";

export default function RemoteStorageWidget({
    remoteStorage,
    elementId
}: {
    remoteStorage: RemoteStorage;
    elementId: string;
}) {
    const widget = new Widget(remoteStorage);
    widget.attach(elementId);
    return <></>
}