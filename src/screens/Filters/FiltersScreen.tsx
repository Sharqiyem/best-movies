import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {YEAR_MIN, YEAR_MAX} from '@src/constants';
import {Colors} from '@src/constants/colors';
import {countries, genres} from '@src/data/filterData';
import {
  Filters,
  FiltersScreenRouteProp,
  MOVIE_TYPE,
} from '@src/navigation/types';
import {StoreContext, StoreContextType} from '@src/store/StoreContext';
import React, {useContext, useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import {RadioGroup} from 'react-native-radio-buttons-group';
import Ionicons from 'react-native-vector-icons/Ionicons';

function FiltersScreen(): JSX.Element {
  const {isDark} = useContext(StoreContext) as StoreContextType;

  const navigation = useNavigation();
  const {params} = useRoute<FiltersScreenRouteProp>();
  const selectedFilters = params.selectedFilters;
  // console.log('params selectedFilters', selectedFilters);

  const {width} = useWindowDimensions();

  const selectedFiltersGenres = genres.filter(s =>
    selectedFilters.genres?.includes(s.value),
  );

  const selectedFiltersCountries = countries.filter(s =>
    selectedFilters.countries?.includes(s.value),
  );

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [yearsSliderValues, setYearsSliderValues] = useState([
    selectedFilters.years?.[0] ?? YEAR_MIN,
    selectedFilters.years?.[1] ?? YEAR_MAX,
  ]);
  const [ratingSliderValues, setRatingSliderValues] = useState([
    Math.min(
      selectedFilters.rating?.[0] ?? 0,
      selectedFilters.rating?.[1] ?? 0,
    ),
    Math.max(
      selectedFilters.rating?.[0] ?? 10,
      selectedFilters.rating?.[1] ?? 10,
    ),
  ]);

  const [selectedType, setSelectedType] = useState<MOVIE_TYPE>(
    selectedFilters?.type ?? 'all',
  );

  const typeButtons = useMemo(
    () => [
      {
        id: 'all',
        label: 'All',
        value: 'all',
        color: Colors.primary[900],
        labelStyle: {color: '#fff'},
        containerStyle: {
          marginLeft: 0,
        },
      },
      {
        id: 'movies',
        label: 'Movies',
        value: 'movies',
        color: Colors.primary[900],
        labelStyle: {color: '#fff'},
      },
      {
        id: 'tv-shows',
        label: 'TV-SHows',
        value: 'tv-shows',
        color: Colors.primary[900],
        labelStyle: {color: '#fff'},
      },
    ],
    [],
  );

  const sharedMultipleSelectListProps = {
    labelStyles: {color: isDark ? '#fff' : '#000'},
    dropdownTextStyles: {color: isDark ? '#fff' : '#000'},
    inputStyles: {color: isDark ? '#fff' : '#000'},
    checkBoxStyles: {backgroundColor: '#fff'},
    // dropdownStyles: {color: isDark ? '#fff' : '#000'},
    // boxStyles: {color: isDark ? '#fff' : '#000'},
    // dropdownItemStyles: {color: isDark ? '#fff' : '#000'},
    closeicon: (
      <Ionicons
        name="close"
        color={isDark ? '#ffffff30' : '#00000030'}
        size={20}
      />
    ),
    arrowicon: (
      <Ionicons
        name="chevron-down"
        color={isDark ? '#ffffff30' : '#00000030'}
        size={20}
      />
    ),
    searchicon: (
      <Ionicons
        name="search"
        color={isDark ? '#ffffff30' : '#00000030'}
        size={20}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{paddingRight: 10}}
      />
    ),
  };

  const goBack = () => {
    navigation.goBack();
  };

  const submit = () => {
    const vals: Filters = {
      genres: selectedGenres,
      countries: selectedCountries,
      years: [yearsSliderValues[0], yearsSliderValues[1]],
      rating: [ratingSliderValues[0], ratingSliderValues[1]],
      type: selectedType,
    };

    params.onGoBack(vals);
    navigation.goBack();
  };

  const renderHeader = () => {
    return (
      <View className="flex-row justify-between items-center px-4 my-4 ">
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={goBack}
          className="">
          <Ionicons name="arrow-back" size={24} color="gray" />
        </TouchableOpacity>
        <Text className="text-base font-bold text-gray-700 dark:text-white/80">
          Filters
        </Text>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={submit}
          className="">
          <Ionicons name="checkmark" size={24} color={Colors.primary[900]} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderForm = () => {
    return (
      <ScrollView className="px-4 pt-3">
        <View className="">
          <Text className="dark:text-white/80 mb-2">Type</Text>
          <RadioGroup
            radioButtons={typeButtons}
            onPress={setSelectedType}
            selectedId={selectedType}
            layout="row"
          />
        </View>

        <View className="mt-4">
          <MultipleSelectList
            {...sharedMultipleSelectListProps}
            label="Genre"
            placeholder="Select Genre"
            setSelected={setSelectedGenres}
            data={genres}
            save="value"
            defaultOptions={selectedFiltersGenres}
          />
        </View>

        <View className="mt-4">
          <Text className="dark:text-white/80">
            Year: [{yearsSliderValues[0]}, {yearsSliderValues[1]}]
          </Text>
          <View className="w-full items-center ">
            <MultiSlider
              selectedStyle={{backgroundColor: Colors.primary[900]}}
              // enableLabel
              // customLabel={(props: any) => <SliderLabel {...props} />}
              sliderLength={width - 50}
              values={yearsSliderValues}
              min={YEAR_MIN}
              max={YEAR_MAX}
              // step={1}
              allowOverlap
              onValuesChange={values => setYearsSliderValues(values)}
              markerStyle={styles.markerStyle}
            />
          </View>
        </View>
        <View className="mt-4">
          <MultipleSelectList
            {...sharedMultipleSelectListProps}
            label="Country"
            placeholder="Select Country"
            setSelected={(val: string) => setSelectedCountries(val)}
            // defaultOption={selectedCountries}
            data={countries}
            save="value"
            defaultOptions={selectedFiltersCountries}
          />
        </View>
        <View className="mt-4">
          <Text className="dark:text-white/80">
            Rating: [{ratingSliderValues[0]}, {ratingSliderValues[1]}]
          </Text>
          <View className="w-full items-center mt-3">
            <MultiSlider
              selectedStyle={{backgroundColor: Colors.primary[900]}}
              // enableLabel
              // customLabel={(props: any) => <SliderLabel {...props} />}
              sliderLength={width - 50}
              values={ratingSliderValues}
              min={0}
              max={10}
              step={0.5}
              snapped
              allowOverlap
              onValuesChange={values => setRatingSliderValues(values)}
              markerStyle={styles.markerStyle}
            />
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-slate-800">
      {renderHeader()}

      {renderForm()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  markerStyle: {
    width: 20,
    height: 20,
  },
});
export default FiltersScreen;
