import { useParams } from "react-router-dom"
import { useGetChat } from "../../hooks/useGetChat";

const Chat = () => {
    const params = useParams();
    const { data } = useGetChat({ _id: params._id! });

    return (
        <div>
            <h1>Chat</h1>
            {data ? (
                <div>
                    <h2>Chat ID: {data.chat._id}</h2>
                    <p>Name: {data.chat.name}</p>
                    <p>User IDs: {data.chat.userIds.join(', ')}</p>
                    <p>Is Private: {data.chat.isPrivate ? 'Yes' : 'No'}</p>
                </div>
            ) : (
                <p>Loading chat data...</p>
            )}
        </div>
    )
}

export default Chat
