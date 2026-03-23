import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { supabase } from '../lib/supabase';

function getOrCreateSession() {
    let sid = sessionStorage.getItem('sid');
    if (!sid) {
        sid = uuid();
        sessionStorage.setItem('sid', sid);
    }
    return sid;
}

export function useAnalytics() {
    const location = useLocation();

    useEffect(() => {
        const sessionId = getOrCreateSession();
        const path = location.pathname;

        // Log page view
        supabase.from('page_views').insert({
            path,
            referrer: document.referrer || null,
            user_agent: navigator.userAgent,
            session_id: sessionId,
        });

        // Upsert visitor
        supabase
            .from('visitors')
            .upsert(
                {
                    session_id: sessionId,
                    device: /Mobi/.test(navigator.userAgent) ? 'mobile' : 'desktop',
                    last_seen: new Date().toISOString(),
                },
                { onConflict: 'session_id', ignoreDuplicates: false }
            );
    }, [location.pathname]);
}