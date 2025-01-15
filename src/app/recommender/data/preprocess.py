import string

import pandas as pd


def clean_text(text: str) -> str:
    """
    """
    text = text.translate(str.maketrans('', '', string.punctuation))
    text = text.lower()
    return text


def split_text(text: str) -> list:
    """
    """
    text = text.lower()
    tokens = text.split(", ")
    return tokens


class MovieDataPreprocessor:
    def __init__(self, df: pd.DataFrame):
        """
        """
        self.df = df

    def handle_missing_values(self) -> None:
        """
        """
        self.df['title'].dropna(inplace=True)

        missing_values_features = ['overview', 'tagline', 'genres', 'production_companies', 'production_countries', 'keywords', 'release_date']

        for feature in missing_values_features:
            self.df[feature].fillna('empty', inplace=True)

    def clean_and_split(self) -> None:
        """
        """
        clean_text_features = ['overview', 'tagline', 'keywords']
        split_text_features = ['genres', 'original_language', 'production_companies', 'production_countries']

        for feature in clean_text_features:
            self.df[feature].apply(clean_text)

        for feature in split_text_features:
            self.df[feature].apply(split_text)

    def preprocess(self) -> pd.DataFrame:
        """
        """
        self.handle_missing_values()
        self.clean_and_split()
        return self.df


class ShowDataPreprocessor:
    def __init__(self, df: pd.DataFrame):
        """
        """
        self.df = df

    def handle_missing_values(self) -> None:
        """
        """
        self.df['name'].dropna(inplace=True)

        missing_values_features = ['overview', 'tagline', 'genres', 'languages', 'production_companies', 'production_countries', 'first_air_date', 'created_by', 'networks']

        for feature in missing_values_features:
            self.df[feature].fillna('empty', inplace=True)

    def clean_and_split(self) -> None:
        """
        """
        clean_text_features = ['overview', 'tagline']
        split_text_features = ['genres', 'languages', 'production_companies', 'production_countries', 'networks']

        for feature in clean_text_features:
            self.df[feature].apply(clean_text)

        for feature in split_text_features:
            self.df[feature].apply(split_text)

    def preprocess(self) -> pd.DataFrame:
        """
        """
        self.handle_missing_values()
        self.clean_and_split()
        return self.df
