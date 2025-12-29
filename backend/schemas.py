from pydantic import BaseModel

class ItemCreate(BaseModel):
    name: str
    price: float

class Item(ItemCreate):
    id: int

    class Config:
        from_attributes = True
