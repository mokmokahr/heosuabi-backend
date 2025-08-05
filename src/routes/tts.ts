import express from 'express';

const ttsRouter = express.Router();

ttsRouter.post('/text-to-speech', async (req, res) => {
    try {
        const { text, language="ko",style,model} = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const ttsResponse = await fetch('https://supertoneapi.com/v1/text-to-speech/e5f6fb1a53d0add87afb4f', {
        method: 'POST',
        headers: {
            'x-sup-api-key': process.env.SUPERTONE_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text:text,
            language:language,
            style:style,
            model:model
        })
        });

        if (!ttsResponse.ok) {
        const errorText = await ttsResponse.text();
        throw new Error(`TTS API request failed: ${ttsResponse.status} ${ttsResponse.statusText} - ${errorText}`);
        }

        const audioBuffer = await ttsResponse.arrayBuffer();
        const audioLength = ttsResponse.headers.get('X-Audio-Length');
        
        res.set({
            'Content-Type': 'audio/wav',
            'X-Audio-Length': audioLength || '0'
        });
        
        res.send(Buffer.from(audioBuffer));

    } catch (error) {
        console.error('TTS Error:', error);
        res.status(500).json({ 
        error: 'TTS processing failed',
        message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default ttsRouter;