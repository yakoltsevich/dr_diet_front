'use client';

import { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { axiosClient } from '@/lib/axiosClient';
import { Select, SelectItem, Skeleton } from '@heroui/react';
import { Switch } from '@heroui/switch';

const languageOptions = ['en', 'ru'];
const sourcesList = ['user', 'ai'];


export default function Settings() {

  const [menu, setMenu] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(new Set(['en']));
  const [ingredientSources, setIngredientSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const generateMenu = async () => {
    setLoading1(true);
    setError(null);
    try {
      const response = await axiosClient.post('/menu/generate', { body: {} });
      setMenu(response.data.menu);
    } catch (err) {
      console.error(err);
      setError('Error while generating the menu');
    } finally {
      setLoading1(false);
    }
  };
  const fillRecipe = async () => {
    setLoading2(true);
    setError(null);
    try {
      const response = await axiosClient.post('/menu/fill-recipe', { body: {} });
      setMenu(response.data.menu);
    } catch (err) {
      console.error(err);
      setError('Error while generating the menu');
    } finally {
      setLoading2(false);
    }
  };
  const calculateNutrition = async () => {
    setLoading3(true);
    setError(null);
    try {
      const response = await axiosClient.post('/menu/calculate-nutrition', { body: {} });
      setMenu(response.data.menu);
    } catch (err) {
      console.error(err);
      setError('Error while generating the menu');
    } finally {
      setLoading3(false);
    }
  };

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await axiosClient.get('/settings');
        setLanguage(new Set([res.data.language]));
        setIngredientSources(res.data.ingredientSources || []);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleUpdate = async () => {
    setUpdateLoading(true);

    try {
      const languageValue = Array.from(language)[0];
      await axiosClient.put('/settings', { language: languageValue, ingredientSources });
    } finally {
      setUpdateLoading(false);
    }
  };

  const toggleSource = (source) => {
    setIngredientSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source],
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-[#353535]">Settings</h1>
      {/*<div className="max-w-7xl mx-auto p-4 min-h-[calc(100vh-217px)] space-y-2">*/}
      {/*    {*/}
      {/*        (*/}
      {/*            <ButtonGroup size={'sm'} className={'w-full sm:max-w-xs '}>*/}
      {/*                <Button onPress={generateMenu} disabled={loading1} className="w-xs">*/}
      {/*                    {loading1 ? 'Generating menu...' : 'Generate menu'}*/}
      {/*                </Button>*/}
      {/*                <Button onPress={fillRecipe} disabled={loading2} className="w-xs">*/}
      {/*                    {loading2 ? 'filling Recipe...' : 'Fill Recipe'}*/}
      {/*                </Button>*/}
      {/*                <Button onPress={calculateNutrition} disabled={loading3} className="w-xs">*/}
      {/*                    {loading3 ? 'calculating...' : 'Calculate Nutrition'}*/}
      {/*                </Button>*/}
      {/*            </ButtonGroup>*/}
      {/*        )*/}
      {/*    }*/}
      {/*</div>*/}
      <Skeleton className="rounded-lg" isLoaded={!loading}>
        <Select variant="flat" selectedKeys={language} onSelectionChange={setLanguage} className="w-full"
                label="Select an language">
          {languageOptions.map((option) => (
            <SelectItem key={option}>{option.toUpperCase()}</SelectItem>
          ))}
        </Select>
      </Skeleton>

      <div>
        <label className="block mb-2 text-[#353535]">Ingredient Sources</label>
        <div className="space-y-2">
          {sourcesList.map((src) => {
            return (
              <div key={src} className="flex items-center justify-between">
                <span className="text-sm text-[#353535]">{src}</span>
                <Skeleton className="rounded-full" isLoaded={!loading}>
                  <Switch
                    disabled={src === 'user'}
                    isSelected={ingredientSources.includes(src)}
                    onValueChange={() => toggleSource(src)}
                  />
                </Skeleton>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        onPress={handleUpdate}
        className="w-full bg-[#5e7a76] text-white rounded-lg shadow-md"
        isDisabled={loading}
        isLoading={updateLoading}
      >
        Save Settings
      </Button>
    </div>
  );
}
