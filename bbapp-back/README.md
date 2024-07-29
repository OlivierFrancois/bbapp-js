Mettre en production :
 * Si déjà build, éventuellement récupérer /build/.env
 * git pull
 * node ace migration:run
 * node ace build
 * vim /build/.env (compléter le .env)
 * Reset pm2
   * pm2 delete all 
   * pm2 start ecosystem.config.cjs
