-- Remove os 2 placeholders pra quem não foi encontrada nenhuma faixa real no tom certo.
delete from playbacks where slug in ('gospel-up-tempo-em-mib', 'bossa-lenta-em-fa');
