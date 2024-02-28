SELECT 'CREATE DATABASE macroestheticdb'
WHERE NOT EXISTS (SELECT FRROM pg_database WHERE datname = 'macroestheticdb')\gexec