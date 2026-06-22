-- Vincula vídeos do YouTube encontrados pra 10 dos 12 placeholders que ainda não tinham áudio.
-- Os 2 que faltam (Gospel Up-Tempo em Mi♭, Bossa Lenta em Fá) não tiveram match confiável encontrado.
update playbacks set youtube_id = 'tvfj4zyZTVU', duration_seconds = 609 where slug = 'blues-em-do';
update playbacks set youtube_id = 'EXFoUSiNlAs', duration_seconds = 335 where slug = 'blues-lento-em-sol';
update playbacks set youtube_id = '4VrGGHkO-PI', duration_seconds = 247 where slug = 'blues-rapido-em-fa';
update playbacks set youtube_id = 'LAo6o544KzE', duration_seconds = 541 where slug = 'balada-gospel-em-re';
update playbacks set youtube_id = 'xz6UVcUiCwc', duration_seconds = 397 where slug = 'hino-tradicional-em-sib';
update playbacks set youtube_id = 'RSmu_ID0eJU', duration_seconds = 523 where slug = 'balada-pop-em-do';
update playbacks set youtube_id = 'ozi6198qvoc', duration_seconds = 278 where slug = 'pop-dancante-em-la';
update playbacks set youtube_id = 'z96qKzASRQY', bpm = 130, duration_seconds = 622 where slug = 'pop-rock-em-mi';
update playbacks set youtube_id = 'iyb7D_FM3Uw', duration_seconds = 391 where slug = 'bossa-em-re-menor';
update playbacks set youtube_id = '05wOWDlMtHU', duration_seconds = 240 where slug = 'bossa-em-sol-com-modulacao';
