import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { Favorite } from './interfaces';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    async function loadFavorites(): Promise<void> {
      const { data } = await api.get<Favorite[]>('favorites');
      setFavorites(data);
    }

    loadFavorites();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus favoritos</HeaderTitle>
      </Header>
      <FoodsContainer>
        <FoodList
          data={favorites}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food activeOpacity={0.6}>
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{formatValue(item.price)}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Favorites;