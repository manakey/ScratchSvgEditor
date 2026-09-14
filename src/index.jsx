import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {IntlProvider, intlReducer} from 'react-intl-redux';
import paintMessages from 'scratch-l10n/locales/paint-editor-msgs';
import PaintEditor, {ScratchPaintReducer} from 'scratch-paint';
import './style.css';

const reducer = combineReducers({
    intl: intlReducer,
    scratchPaint: ScratchPaintReducer
});

const initialState = {
    intl: {
        defaultLocale: 'en',
        locale: 'en',
        messages: paintMessages.en.messages
    }
};

const store = createStore(reducer, initialState);

const initialSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360"><rect width="480" height="360" fill="#ffffff"/></svg>';

function App() {
    const [image, setImage] = useState(initialSvg);
    const [name, setName] = useState('untitled.svg');
    const [imageId] = useState(() => `svg-${Date.now()}`);

    const download = () => {
        const blob = new Blob([image], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name.toLowerCase().endsWith('.svg') ? name : `${name}.svg`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const openFile = event => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setImage(reader.result);
                setName(file.name);
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    return (
        <div className="app">
            <header className="topbar">
                <div className="brand">SVG Editor</div>
                <div className="actions">
                    <label className="button">SVGを開く<input type="file" accept=".svg,image/svg+xml" onChange={openFile}/></label>
                    <button className="button primary" onClick={download}>SVGを保存</button>
                </div>
            </header>
            <main className="editor">
                <PaintEditor
                    image={image}
                    imageFormat="svg"
                    imageId={imageId}
                    name={name}
                    rotationCenterX={240}
                    rotationCenterY={180}
                    onUpdateName={setName}
                    onUpdateImage={newImage => {
                        if (typeof newImage === 'string') setImage(newImage);
                    }}
                />
            </main>
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <IntlProvider>
            <App />
        </IntlProvider>
    </Provider>
);
