import os
import uvicorn
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maptocanada.settings')

app = get_asgi_application()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000,
                log_level="info", proxy_headers=True, 
                timeout_keep_alive=300)
