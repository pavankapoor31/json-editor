import React, { useEffect, useState } from 'react';
import JsonEditor from '../components/JsonEditor';
import { predefinedAgents } from '../static/agents';

const initialValue = JSON.stringify(predefinedAgents[0], null, 2);

const Editor = () => {
    return (
        <div className="min-h-screen w-[100vw] bg-gray-900 text-black px-3 py-1 transition-all flex flex-col dark:bg-gray-900 dark:text-white">
            <div className="flex-grow mt-2">
                <JsonEditor initialValue={initialValue} height="calc(100vh - 12rem)" />
            </div>
        </div>
    );
};

export default Editor;