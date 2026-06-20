-- Eleva o limite de tamanho de arquivo do bucket 'pdfs' para acomodar métodos históricos digitalizados maiores (ex.: Thiels, 1903, ~64MB).
update storage.buckets set file_size_limit = 104857600 where id = 'pdfs';
