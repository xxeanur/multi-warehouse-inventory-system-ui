export interface CustomResponseDto<T> {
    data: T | null;
    success: boolean;
    errorMessage?: string[];
}