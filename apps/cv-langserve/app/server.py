from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from langserve import add_routes

from app.aicv import chain as pinecone_cv_chain
from app.rolecover import chain as pinecone_rolecover_chain
from app.rolematch import chain as pinecone_rolematch_chain

app = FastAPI()


@app.get('/')
async def redirect_root_to_docs():
	return RedirectResponse('/docs')


# Edit this to add the chain you want to add
add_routes(app, pinecone_cv_chain, path='/cv')
add_routes(app, pinecone_rolematch_chain, path='/match')
add_routes(app, pinecone_rolecover_chain, path='/cover')

# if __name__ == '__main__':
# 	import uvicorn

# 	uvicorn.run(app, host='127.0.0.1', port=8000)
