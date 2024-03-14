type InputMessageProps = {
    message: string;
    setMessage: (text: string) => void;
    send: (message?: string) => void;
    isMarcinWriting: boolean;
    messageTemplates: string[];
};

export default function InputMessage({
    message,
    setMessage,
    send,
    isMarcinWriting,
    messageTemplates,
}: InputMessageProps) {
    const handleClickTemplateMessage = (templateMessage: string) => {
        send(templateMessage);
    };

    return (
        <div className="w-full">
            <div className="flex items-center flex-col p-2 bg-gray-50 dark:bg-gray-700 relative">
                <div className="flex items-start justify-start flex-nowrap w-full overflow-scroll">
                    {messageTemplates.map((tm: string) => {
                        return (
                            <span onClick={() => handleClickTemplateMessage(tm)} className="mr-2 bg-gray-100 text-gray-800 text-sm px-2.5 py-0.5 rounded-full dark:bg-gray-800 dark:text-gray-300 opacity-75 whitespace-nowrap hover:cursor-pointer">
                                {tm}
                            </span>
                        );
                    })}
                </div>
                <div className="mt-2 relative overflow-hidden w-full">
                    <input
                        type="text"
                        disabled={isMarcinWriting}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-white border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={`${isMarcinWriting ? "Poczekaj na odpowiedź..." : "Wpisz wiadomość..."}`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        onClick={() => send()}
                        className={`absolute bottom-1/2 translate-y-1/2 ${
                            !isMarcinWriting ? "right-2 opacity-1" : "-right-8 opacity-0"
                        } transition-all duration-300 inline-flex justify-center p-2 text-blue-600 cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600`}>
                        <svg
                            className="w-5 h-5 rotate-90 rtl:-rotate-90"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
